// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Main page loaded');
  
  // Featured news section - Fetch from Firestore
  const fetchFeaturedNews = async () => {
    try {
      const newsSnapshot = await db.collection('articles')
        .orderBy('createdAt', 'desc')
        .limit(3)
        .get();
      
      if (newsSnapshot.empty) {
        console.log('No featured articles found');
        return;
      }
      
      const newsGrid = document.querySelector('.news-grid');
      if (!newsGrid) return;
      
      // Clear existing news cards
      newsGrid.innerHTML = '';
      
      newsSnapshot.forEach(doc => {
        const article = doc.data();
        const articleCard = createNewsCard(doc.id, article);
        newsGrid.appendChild(articleCard);
      });
    } catch (error) {
      console.error('Error fetching featured news:', error);
    }
  };
  
  // Create news card element
  const createNewsCard = (id, article) => {
    const card = document.createElement('div');
    card.classList.add('news-card');
    
    card.innerHTML = `
      <img src="${article.imageUrl || '../img/placeholder.jpg'}" alt="${article.title}">
      <div class="news-content">
        <span class="category">${article.category}</span>
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
        <a href="pages/article.html?id=${id}" class="read-more">Read More</a>
      </div>
    `;
    
    return card;
  };
  
  // Check if we're on the home page
  if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
    // Initialize featured news if there are articles in Firestore
    db.collection('articles').get().then(snapshot => {
      if (!snapshot.empty) {
        fetchFeaturedNews();
      }
    });
  }
}); 