const dummy = (_blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0
    ? 0
    :blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let indexFavorite = 0;  // index of blog with most likes
  let likes = 0;  // number of likes of the favorite blog

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > likes) {
      indexFavorite = i;
      likes = blogs[i].likes;
    }
  }

  return blogs[indexFavorite];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  let map = new Map();
  let authorWithMostBlogs = blogs[0].author;

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    if (map.has(author)) {
      const blogCounter = map.get(author);
      map.set(author, blogCounter + 1);
      if ((blogCounter + 1) > map.get(authorWithMostBlogs)) {
        authorWithMostBlogs = author;
      }
    } else {
      map.set(author, 1);
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: map.get(authorWithMostBlogs)
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  let map = new Map();
  let authorWithMostLikes = blogs[0].author;
  let maxLikes = blogs[0].likes;

  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author;
    const likes = blogs[i].likes;
    if (map.has(author)) {
      const currentLikes = map.get(author);
      const totalLikes = likes + currentLikes;
      map.set(author, totalLikes);
      if ( totalLikes > maxLikes) {
        maxLikes = totalLikes;
        authorWithMostLikes = author;
      }
    } else {
      map.set(author, likes);
    }
  }

  return {
    author: authorWithMostLikes,
    likes: maxLikes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
