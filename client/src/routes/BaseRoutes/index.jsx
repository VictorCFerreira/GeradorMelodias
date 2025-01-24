import { Route, Routes } from "react-router-dom";
import { GeracaoPage } from "../../pages/GeracaoPage";
import { AnalisePage } from "../../pages/AnalisePage";
import { HomePage } from "../../pages/homepage";
import { AvaliacaoPage } from "../../pages/avaliacaopage";

export function BaseRoutes() {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/geracao" element={<GeracaoPage />} />
        <Route path="/avaliacao" element={<AvaliacaoPage />} />
        <Route path="/analise" element={<AnalisePage />} />
      </Routes>
    </>
  );
}
