package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.service.MelodiaService;
import org.jfugue.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> playMelodia(@PathVariable  long id) throws Exception {
        Optional<Melodia> melodia = melodiaService.findById(id);
        Player player = new Player();

        player.play(melodia.get().getMelodia());

        return ResponseEntity.ok().build();
    }
}
