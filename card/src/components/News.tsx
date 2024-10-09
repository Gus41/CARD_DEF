import { useEffect, useState } from 'react';

interface newsProps {
  set: (title: string, description: string, image_path: string,link:string) => void;
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
  slug:string
}

const NewsComponent = (props: newsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_NEWS_API_URL; // Acessando a variável de ambiente

    if (apiUrl) {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
        setNews(data);
        })
        .catch((error) => {
        console.error('Error fetching news:', error);
        });
    } else {
    console.error('API URL is undefined');
    }

  }, []);

  function renderNews() {
    return news.map((n, i) => {
      console.log(n)
      return (
        <p
          onClick={() => {
            props.set(n.title, n.descricao.descricao, n.featured_image.guid,'https://www.ucs.br/site/noticias/' + n.slug);
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
    <div className="absolute right-0 top-0 w-64 h-[500px] overflow-y-scroll bg-black shadow-lg rounded-lg p-4">
      <h1 className="text-lg font-bold mb-4">Últimas notícias</h1>
      {news.length > 0 ? renderNews() : <p>Loading news...</p>}
    </div>
  );
};

export default NewsComponent;
