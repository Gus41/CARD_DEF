import { useEffect, useState } from 'react';

interface newsProps{
    set: (title:string,description:string,image_path:string)=>void
}


interface NewsItem {
  id: number;
  title: string;
}

const NewsComponent = (props : newsProps) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('https://sou.ucs.br/noticias/wp-json/posts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  function renderNews() {
    return news.map((n, i) => {
      return (
        <p onClick={()=>{
            props.set(n.title,n.descricao.descricao,n.featured_image.guid)
        }} className="bg-gray-800 m-2 p-2 rounded-lg cursor-pointer" key={i}>
          {n.title}
        </p>
      );
    });
  }

  return (
    <div className="absolute right-0 top-0 w-64 h-[500px] overflow-y-scroll bg-black shadow-lg rounded-lg p-4">
      <h1 className="text-lg font-bold mb-4">Ultimas notícias</h1>
      {news.length > 0 ? renderNews() : <p>Loading news...</p>}
    </div>
  );
};

export default NewsComponent;
