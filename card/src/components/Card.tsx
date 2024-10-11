import Image from "next/image";
interface cardProps {
    title: string;
    description: string;
    imageSrc: string | null;
}

export default function Card(props: cardProps) {
    return (
        <div className="flex flex-col max-w-[340px] shadow-lg overflow-hidden" id="card">
            <div className="bg-[#0052ea] relative min-h-[125px]">
                <div className="flex items-center justify-center min-h-[128px] px-4 h-full flex-1">
                    <h2 className="relative z-20 text-white">{props.title.replace("<i>","").replace("</i>","")}</h2>
                </div>
                <Image className="absolute top-0 right-0 " src={'/topo.png'} width={46} height={60} alt="Element" quality={100} />
            </div>

            <div className="bg-gray-300 relative flex items-center justify-center">
                {props.imageSrc ? (
                    <Image
                        alt="User uploaded image"
                        src={props.imageSrc}
                        width={300}
                        height={200}
                        quality={100}
                        className="object-cover object-center w-full h-auto max-h-44"
                    />
                ) : false
                }
            </div>

            <div className="bg-[#0052ea] flex flex-col">
                <p className="text-white text-[14px] leading-5 m-4">{props.description}</p>
                <p className="text-white text-[12px] bg-[#E00000] p-1 text-center w-full mx-auto ">Saiba mais em <b>ucs.br</b></p>
            </div>

            <div className="flex items-center justify-center flex-col p-2 gap-2 bg-[#0034a4]">
                <Image alt="logo" src={'/ucs.png'} width={70} height={70} quality={100}  />
            </div>
        </div>
    );
}