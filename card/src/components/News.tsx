import { useEffect, useState } from 'react';

interface newsProps {
  set: (title: string, description: string, image_path: string, link: string) => void;
}

interface Descricao {
  descricao: string;
}

interface Featured_image {
  guid: string;
}

interface NewsItem {
  id: number;
  title: string;
  descricao: Descricao;
  featured_image: Featured_image;
  slug: string;
}

const NewsComponent = (props: newsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL;

    if (apiUrl) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setNews(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching news:', error);
          setError('Failed to fetch news. Please try again later.');
          setLoading(false);
        });
    } else {
      console.error('API URL is undefined');
      setError('API URL is undefined');
      setLoading(false);
    }
  }, []);

  function showError(error: string) {
    setError(error);
  }

  function renderNews() {
    return news.map((n, i) => {
      return (
        <p
          onClick={() => {
            if (n.featured_image && n.descricao && n.descricao.descricao) {
              props.set(n.title, n.descricao.descricao, n.featured_image.guid, 'https://www.ucs.br/site/noticias/' + n.slug);
            } else {
              showError("Notícia sem imagem cadastrada ou descrição.");
            }
          }}
          className="bg-gray-800 m-2 p-2 rounded-lg cursor-pointer"
          key={i}
        >
          {n.title}
        </p>
      );
    });
  }

  return (
    <div>
      <div className="absolute right-0 top-0 w-64 h-[500px] overflow-y-scroll bg-black shadow-lg rounded-lg p-4">
        <h1 className="text-lg font-bold mb-4">Últimas notícias</h1>
        {loading ? (
          <p>Loading news...</p> 
        )
        : (
          renderNews()
        )}
      </div>
      {error && (
        <div className="text-white bg-red-700 p-1 max-w-56 text-center absolute right-3 rounded-lg top-[520px] cursor-pointer"
          onClick={()=>setError(null)}
        >
          {error}
          <div className='relative bg-blue-800'>
            <p className='absolute top-[-50px] left-2'>x</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
