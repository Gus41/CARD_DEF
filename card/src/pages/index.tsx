import { useState, useRef } from "react";
import { toJpeg } from "html-to-image";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import News from "@/components/News";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false); // Estado para controlar a visibilidade do formulário
  const cardRef = useRef<HTMLDivElement>(null);
  const [newsLink,setNewsLink] = useState<string | null>(null)
  const router = useRouter();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  function setNews(title: string, description: string, image_path: string,link:string) {
    setDescription(description);
    setTitle(title);
    setImageSrc(image_path);
    setNewsLink(link)
  }

  const downloadCardAsImage = () => {
    if (cardRef.current === null) return;

    toJpeg(cardRef.current, { pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'card-image.jpeg';
        link.click();
      })
      .catch((err) => {
        console.error('Erro ao gerar imagem:', err);
      }).then(() => {
        setImageSrc(null);
        router.reload();
      });
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Alterna a visibilidade do formulário
  };

  const handleCopyLink = () => {
    if (newsLink) {
      navigator.clipboard.writeText(newsLink)
        .then(() => {
          alert('Link copiado com sucesso!');
        })
        .catch((err) => {
          console.error('Erro ao copiar o link:', err);
        });
    }
  };
  

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      {newsLink?
        <button 
        onClick={handleCopyLink} 
        className={` text-white rounded-lg hover:text-blue-600`}>
        Copiar link da noticia
      </button>
      :
      false
      }
      <div ref={cardRef}>
        <Card
          title={title}
          description={description}
          imageSrc={imageSrc}
        />
      </div>
      
      <button 
        onClick={toggleFormVisibility} 
        className={`mb-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-600 absolute ${showForm? 'top-52' : 'top-2'} left-6`}>
        {showForm ? 'Esconder Formulário' : 'Mostrar Formulário'}
      </button>

      {showForm && (
        <div className="absolute top-0 left-6 bg-gray-900 p-2">
          <label htmlFor="title" className="block text-lg font-semibold mb-1">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <label htmlFor="description" className="block text-lg font-semibold mb-1">
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <label htmlFor="imageUpload" className="block text-lg font-semibold mb-2">
            Carregar imagem:
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      <button
        onClick={downloadCardAsImage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-3">
        Baixar card como imagem
      </button>
      <News set={setNews} />
    </div>
  );
}
