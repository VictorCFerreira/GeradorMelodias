import { Route, Routes } from "react-router-dom";
import { GeracaoPage } from "../../pages/GeracaoPage";
import { AnalisePage } from "../../pages/AnalisePage";
import { AvaliacaoPage } from "../../pages/AvaliacaoPage";

export function BaseRoutes() {
  return (
    <>
      <Routes>

        <Route path="/" element={<GeracaoPage />} />
        <Route path="/avaliacao/:melodiaId" element={<AvaliacaoPage />} />
        <Route path="/analise" element={<AnalisePage />} />
      </Routes>
    </>
  );
}
