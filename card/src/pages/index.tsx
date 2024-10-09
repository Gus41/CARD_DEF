import { useState, useRef } from "react";
import { toPng,toJpeg } from "html-to-image";
import Card from "@/components/Card";

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
    }
  };

  const downloadCardAsImage = () => {
    if (cardRef.current === null) return;

    toJpeg(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'card-image.png';
        link.click();
      })
      .catch((err) => {
        console.error('Erro ao gerar imagem:', err);
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div ref={cardRef}>
        <Card
          title={title}
          description={description}
          imageSrc={imageSrc}
        />
      </div>

      <div className="m-10">
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

      <button
        onClick={downloadCardAsImage}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Baixar card como imagem
      </button>
    </div>
  );
}
