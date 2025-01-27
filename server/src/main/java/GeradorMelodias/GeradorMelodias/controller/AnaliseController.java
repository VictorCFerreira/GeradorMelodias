package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.request.RequestAnaliseParametroNotaDTO;
import GeradorMelodias.GeradorMelodias.dto.request.RequestAnaliseParametroSensacaoDTO;
import GeradorMelodias.GeradorMelodias.dto.response.AnaliseNotaAvaliadaPorParametro;
import GeradorMelodias.GeradorMelodias.dto.response.AnaliseSensacaoAvaliadaPorParametro;
import GeradorMelodias.GeradorMelodias.service.MelodiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/analises")
public class AnaliseController {

    @Autowired
    private MelodiaService melodiaService;

    @GetMapping("/sensacao-parametro")
    public List<AnaliseSensacaoAvaliadaPorParametro> getAnalisePorSensacaoEParametro(RequestAnaliseParametroSensacaoDTO dto) {
        System.out.println("puxando pesquisa sensacao parametro: " + dto.parametro() + " " + dto.sensacao());
        return melodiaService.getAnaliseSensacaoPorParametro(dto);
    }

    @GetMapping("/nota-parametro")
    public List<AnaliseNotaAvaliadaPorParametro> getAnalisePorNotaEParametro(RequestAnaliseParametroNotaDTO dto) {
        System.out.println("puxando pesquisa sensacao parametro: " + dto.parametro() + " " + dto.notaMinima() + "-" + dto.notaMaxima());
        return melodiaService.getAnaliseSensacaoPorParametro(dto);
    }
}
