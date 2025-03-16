"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";

import CardLightNormal from "@/components/CardLightNormal";
import CardLightHolo from "@/components/CardLightHolo";
import CardLightHoloReverse from "@/components/CardLightHoloReverse";
import CardLightPokeball from "@/components/CardLightPokeball";
import CardLightMasterball from "@/components/CardLightMasterball";

const TYPE_COLORS = {
  "Normal": "bg-yellow-500",
  "Holo Reverse": "bg-blue-500",
  "Holo": "bg-green-500",
  "Pokeball": "bg-red-500",
  "Masterball": "bg-purple-500",
};

const CARD_COMPONENTS = {
  "Normal": CardLightNormal,
  "Holo Reverse": CardLightHoloReverse,
  "Holo": CardLightHolo,
  "Pokeball": CardLightPokeball,
  "Masterball": CardLightMasterball,
};

export default function Home() {
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(""); // Si no hay archivo, limpiar el estado
    }
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setJsonData(null); // Forzar actualización
        setTimeout(() => setJsonData(data), 0); // Volver a asignar después de resetear
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-800 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-100 tracking-wide">Welcome</h1>
      <p className="text-lg mb-6">Upload your JSON file to process the cards</p>
      <Card className="p-6 bg-gray-700 border border-gray-600 shadow-xl rounded-2xl flex items-center justify-center w-125 transition-all hover:shadow-2xl">
        <CardContent className="flex flex-col items-center space-y-4 w-110">
        <div className="w-full text-center">
          <input
            id="jsonUpload"
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="jsonUpload"
            className="w-full cursor-pointer text-white bg-gray-800 border border-gray-600 py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Upload a JSON file
          </label>
          {fileName && (
            <p className="mt-2 text-gray-300 text-sm">{fileName}</p>
          )}
        </div>
        </CardContent>
      </Card>
      {jsonData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-8xl mt-6">
          {renderCardColumn("Correct Publication Stock", jsonData.Correct_Publication_Stock)}
          {renderCardColumn("Update Publication Stock", jsonData.Update_Publication_Stock)}
          {renderCardColumn("Create Publication", jsonData.Create_Publication)}
        </div>
      )}
    </div>
  );
}

const renderCardColumn = (title, cards) => {
  return (
    <div className="bg-gray-700 p-5 rounded-xl shadow-xl w-full flex flex-col max-h-[600px] border border-gray-600">
      <h2 className="text-xl font-semibold text-center mb-3 text-gray-200">{title}</h2>
      <ScrollArea className="rounded-md max-h-[500px] pb-2">
          {cards.length === 0 ? (
            <p className="text-center text-gray-400">No hay cartas en esta sección</p>
          ) : (
            cards.map((card, index) => <CardComponent key={index} card={card} />)
          )}
      </ScrollArea>
    </div>
  );
};

const CardComponent = ({ card }) => {
  const [open, setOpen] = useState(false);
  const CardLightComponent = CARD_COMPONENTS[card.type] || Card;

  return (
    <>
      <Card className="bg-gray-800 text-white p-3 m-3 rounded-xl shadow-md border border-gray-600 hover:shadow-lg transition-all">
        <CardContent className="grid grid-cols-[auto_1.2fr_2fr] gap-1 items-center">
          {/* Columna 1: Imagen */}
          <div className="flex cursor-pointer" onClick={() => setOpen(true)}>
            <CardLightComponent>
              <Image 
                src={card.url} 
                alt={card.name} 
                width={90} 
                height={120} 
                className="rounded-md hover:scale-105 transition-transform" 
                unoptimized 
              />
              </CardLightComponent>
            </div>

          {/* Columna 2: Info de la carta */}
          <div className="flex flex-col justify-center text-sm px-1">
            <h3 className="text-sm font-semibold">{card.name}</h3>
            <p className="text-xs text-gray-300">{card.set} - #{card.number}</p>
            <Badge className={`${TYPE_COLORS[card.type] || "bg-gray-500"} text-white px-1 py-0.3 text-xs mt-1`}>
              {card.type}
            </Badge>
            <p className="text-xs mt-1">Stock: {card.stock}</p>
          </div>

          {/* Columna 3: Sugerencias */}
          <div className="flex flex-col justify-start text-xs text-gray-300">
            {Object.keys(card.suggestion).length > 0 ? (
              <SuggestionList suggestions={card.suggestion} />
            ) : (
              <p className="text-center text-red-400 font-semibold">No offer available</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal con shadcn-ui */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-800 text-white max-w-xl mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">
              {card.name}
            </DialogTitle>
            <DialogDescription className="text-center">
              N° {card.number}
            </DialogDescription>
            <DialogClose />
          </DialogHeader>
          <div className="flex justify-center p-1">
            <Image 
              src={card.url} 
              alt={card.name} 
              width={300} 
              height={400} 
              className="rounded-md"
              unoptimized 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SuggestionList = ({ suggestions }) => {
  if (!suggestions || Object.keys(suggestions).length === 0) return null;
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-semibold">Suggestion</h4>
      {suggestions.englishOffer && (
        <p className="flex items-center space-x-1">
          <span>Offer available in </span> <Badge className="bg-[#a2924d] px-1 py-0.3 text-[10px]">English</Badge>
        </p>
      )}
      {suggestions.excellentState && (
        <p className="flex items-center space-x-1">
          <span>In</span> <Badge className="bg-[#4da267] px-1 py-0.3 text-[10px]">Excellent</Badge> <span>condition</span>
        </p>
      )}
      {suggestions.rmPrice && (
        <p className="flex items-center space-x-1">
          <span>Minimum price in the RM:</span> <Badge className="bg-[#4d5da2] px-1 py-0.3 text-[10px]">{suggestions.rmPrice}</Badge><span> CLP</span>
        </p>
      )}
      {suggestions.outsideRmPrice && (
        <p className="flex items-center space-x-1">
          <span>Minimum price outside the RM:</span> <Badge className="bg-[#a24d87] px-1 py-0.3 text-[10px]">{suggestions.outsideRmPrice}</Badge><span> CLP</span>
        </p>
      )}
    </div>
  );
};