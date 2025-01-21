package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.dto.request.CreateMelodiaDTO;
import GeradorMelodias.GeradorMelodias.service.MelodiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/geracao")
public class GeracaoController {

    @Autowired
    private MelodiaService melodiaService;

    @PostMapping
    public ResponseEntity<?> generateMelodia(@RequestBody ParametrosDTO data) throws Exception {
        melodiaService.gerarMelodia(data);

        return ResponseEntity.ok().build();
    }
}
