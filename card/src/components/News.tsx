import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function NewsComponent(props: newsProps){
  const [news, setNews] = useState<NewsItem[]>([]);
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
          props.set(data[0].title,data[0].descricao.descricao,data[0].featured_image.guid, 'https://www.ucs.br/site/noticias/' + data[0].slug)
        })
        .catch((error) => {
          console.error('Error fetching news:', error);
          toast.error('Failed to fetch news. Please try again later.');
          setLoading(false);
        });
        
    } else {
      toast.error('API URL is undefined');
      setLoading(false);
    }
  }, []);

  function renderNews() {
    return news.map((n, i) => {
      return (
        <p
          onClick={() => {
            if (n.featured_image && n.descricao && n.descricao.descricao) {
              props.set(n.title, n.descricao.descricao, n.featured_image.guid, 'https://www.ucs.br/site/noticias/' + n.slug);
              
            } else {
              toast.error("Notícia sem imagem cadastrada ou descrição.");
            }
          }}
          className="bg-gray-800 m-2 p-2 rounded-lg cursor-pointer hover:scale-105 duration-200"
          key={i}
        >
          {n.title.replace("<i>","").replace("</i>","")}
        </p>
      );
    });
  }

  return (
    <div>
      <div className="absolute right-0 top-0 w-80 h-full overflow-y-scroll bg-black shadow-lg rounded-lg p-4">
        <h1 className="text-lg font-bold mb-4">Últimas notícias</h1>
        {loading ? (
          <p>Loading news...</p> 
        )
        : (
          renderNews()
        )}
      </div>

    </div>
  );
};

