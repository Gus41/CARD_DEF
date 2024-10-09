import Image from "next/image";
interface cardProps {
    title: string;
    description: string;
    imageSrc: string | null;
}

export default function Card(props: cardProps) {
    return (
        <div className="flex flex-col w-[540px] h-[540px] shadow-lg overflow-hidden" id="card">
            <div className="bg-[#0052ea] pt-4 pl-4 pb-4 pr-12 relative min-h-[125px]">
                <h2 className="">{props.title}</h2>
                <Image className="absolute top-0 right-0" src={'/topo.png'} width={46} height={60} alt="Element" />
            </div>

            <div className="bg-gray-300 relative flex items-center justify-center">
                {props.imageSrc ? (
                    <Image
                        alt="User uploaded image"
                        src={props.imageSrc}
                        width={300}
                        height={150}
                        className="object-cover object-center w-full h-auto max-h-40"
                    />
                ) : false
                }
                <h2 className="absolute bg-[#fa0100] right-2 bottom-4 p-2 text-basic text-[10px]">SAIBA MAIS</h2>
            </div>

            <div className="bg-[#0052ea] p-4">
                <p className="text-white">{props.description}</p>
            </div>

            <div className="flex items-center justify-center p-2 bg-[#0034a4]">
                <Image alt="logo" src={'/ucs.png'} width={70} height={70} />
            </div>
        </div>
    );
}