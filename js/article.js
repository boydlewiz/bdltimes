// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Article page loaded');
  
  // Get article ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id');
  
  if (!articleId) {
    console.error('No article ID specified');
    window.location.href = '../index.html';
    return;
  }
  
  // Elements
  const articleCategory = document.getElementById('article-category');
  const articleTitle = document.getElementById('article-title');
  const articleDate = document.getElementById('article-date');
  const articleAuthor = document.getElementById('article-author');
  const articleImage = document.getElementById('article-image');
  const articleBody = document.getElementById('article-body');
  const commentForm = document.getElementById('comment-form');
  const commentText = document.getElementById('comment-text');
  const commentsContainer = document.getElementById('comments-container');
  const saveArticleBtn = document.getElementById('save-article');
  
  // Fetch article data
  const fetchArticle = async () => {
    try {
      const articleDoc = await db.collection('articles').doc(articleId).get();
      
      if (!articleDoc.exists) {
        console.error('Article not found');
        window.location.href = '../index.html';
        return;
      }
      
      const article = articleDoc.data();
      
      // Update page elements
      articleCategory.textContent = article.category;
      articleTitle.textContent = article.title;
      articleDate.textContent = formatDate(article.createdAt);
      articleAuthor.textContent = `By ${article.author}`;
      
      if (article.imageUrl) {
        articleImage.src = article.imageUrl;
        articleImage.alt = article.title;
      }
      
      // Set article body content
      articleBody.innerHTML = article.content;
      
      // Update document title
      document.title = `${article.title} - BDL Times`;
      
      // Check if article is saved by current user
      checkIfArticleSaved();
      
      // Fetch related articles
      fetchRelatedArticles(article.category);
      
      // Fetch article comments
      fetchComments();
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };
  
  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Fetch related articles
  const fetchRelatedArticles = async (category) => {
    try {
      const relatedSnapshot = await db.collection('articles')
        .where('category', '==', category)
        .where('__name__', '!=', articleId)
        .limit(2)
        .get();
      
      if (relatedSnapshot.empty) return;
      
      const relatedSection = document.querySelector('.related-articles .news-grid');
      if (!relatedSection) return;
      
      // Clear existing related articles
      relatedSection.innerHTML = '';
      
      relatedSnapshot.forEach(doc => {
        const article = doc.data();
        const relatedCard = document.createElement('div');
        relatedCard.classList.add('news-card');
        
        relatedCard.innerHTML = `
          <img src="${article.imageUrl || '../img/placeholder.jpg'}" alt="${article.title}">
          <div class="news-content">
            <span class="category">${article.category}</span>
            <h3>${article.title}</h3>
            <p>${article.summary}</p>
            <a href="article.html?id=${doc.id}" class="read-more">Read More</a>
          </div>
        `;
        
        relatedSection.appendChild(relatedCard);
      });
    } catch (error) {
      console.error('Error fetching related articles:', error);
    }
  };
  
  // Fetch comments
  const fetchComments = async () => {
    try {
      const commentsSnapshot = await db.collection('articles')
        .doc(articleId)
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .get();
      
      if (commentsSnapshot.empty) {
        commentsContainer.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
      }
      
      // Clear existing comments
      commentsContainer.innerHTML = '';
      
      commentsSnapshot.forEach(doc => {
        const comment = doc.data();
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
      });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  // Create comment element
  const createCommentElement = (comment) => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    
    commentElement.innerHTML = `
      <div class="comment-header">
        <img src="${comment.userPhoto || '../img/placeholder-user.jpg'}" alt="User">
        <div>
          <h4>${comment.userName}</h4>
          <span class="comment-date">${formatDate(comment.createdAt)}</span>
        </div>
      </div>
      <div class="comment-body">
        <p>${comment.text}</p>
      </div>
    `;
    
    return commentElement;
  };
  
  // Check if article is saved
  const checkIfArticleSaved = async () => {
    if (!saveArticleBtn || !auth.currentUser) return;
    
    try {
      const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
      if (!userDoc.exists) return;
      
      const userData = userDoc.data();
      const savedArticles = userData.savedArticles || [];
      
      if (savedArticles.includes(articleId)) {
        saveArticleBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        saveArticleBtn.classList.add('saved');
      }
    } catch (error) {
      console.error('Error checking saved article:', error);
    }
  };
  
  // Save/unsave article
  if (saveArticleBtn) {
    saveArticleBtn.addEventListener('click', async () => {
      if (!auth.currentUser) {
        // Prompt user to login
        alert('Please login to save articles');
        return;
      }
      
      try {
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        const userDoc = await userRef.get();
        
        if (!userDoc.exists) {
          console.error('User document not found');
          return;
        }
        
        const userData = userDoc.data();
        const savedArticles = userData.savedArticles || [];
        const isArticleSaved = savedArticles.includes(articleId);
        
        if (isArticleSaved) {
          // Remove article from saved articles
          await userRef.update({
            savedArticles: firebase.firestore.FieldValue.arrayRemove(articleId)
          });
          
          saveArticleBtn.innerHTML = '<i class="far fa-bookmark"></i> Save Article';
          saveArticleBtn.classList.remove('saved');
        } else {
          // Add article to saved articles
          await userRef.update({
            savedArticles: firebase.firestore.FieldValue.arrayUnion(articleId)
          });
          
          saveArticleBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
          saveArticleBtn.classList.add('saved');
        }
      } catch (error) {
        console.error('Error updating saved articles:', error);
      }
    });
  }
  
  // Add comment
  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!auth.currentUser) {
        alert('Please login to post a comment');
        return;
      }
      
      if (!commentText.value.trim()) {
        alert('Please enter a comment');
        return;
      }
      
      try {
        const user = auth.currentUser;
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};
        
        const commentData = {
          text: commentText.value.trim(),
          userId: user.uid,
          userName: userData.displayName || user.displayName || user.email.split('@')[0],
          userPhoto: userData.photoURL || user.photoURL || '',
          createdAt: new Date()
        };
        
        await db.collection('articles')
          .doc(articleId)
          .collection('comments')
          .add(commentData);
        
        // Clear comment form
        commentText.value = '';
        
        // Refresh comments
        fetchComments();
      } catch (error) {
        console.error('Error adding comment:', error);
        alert('Failed to post comment. Please try again.');
      }
    });
  }
  
  // Initialize
  fetchArticle();
}); 