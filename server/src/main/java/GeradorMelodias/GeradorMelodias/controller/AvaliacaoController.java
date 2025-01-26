package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.request.CreateAvaliacaoDTO;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import GeradorMelodias.GeradorMelodias.service.AvaliacaoService;

import java.util.List;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;



    @PostMapping
    public ResponseEntity<?> receiveAvaliacao(@RequestBody CreateAvaliacaoDTO data) throws Exception {
        avaliacaoService.saveAvaliacao(data);

        return ResponseEntity.ok().build();
    }

    @PostMapping("test")
    public ResponseEntity<?> aa() throws Exception{

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Avaliacao>> getAllAvalicoes() throws Exception {

        List<Avaliacao> avaliacoes = avaliacaoService.findAll();
        return ResponseEntity.ok(avaliacoes);
    }


}
