package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.generic.AvaliacaoDTO;
import GeradorMelodias.GeradorMelodias.dto.request.CreateAvaliacaoDTO;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import GeradorMelodias.GeradorMelodias.service.AvaliacaoService;

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
}
