package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.dto.request.MelodiaCruDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import GeradorMelodias.GeradorMelodias.service.MelodiaService;
import org.jfugue.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/geracao")
public class GeracaoController {

    @Autowired
    private MelodiaService melodiaService;

    @PostMapping
    public ResponseEntity<Integer> generateMelodia(@RequestBody ParametrosDTO data) throws Exception {
        melodiaService.gerarMelodia(data);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> playMelodiaGerada(@PathVariable  long id) throws Exception {
        Optional<Melodia> melodia = melodiaService.findById(id);
        Player player = new Player();

        player.play(melodia.get().getMelodia());

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<String> playMelodia(@RequestBody MelodiaCruDTO melodia) throws Exception {
        Player player = new Player();
        player.play(melodia.melodia());
        return ResponseEntity.ok("tocando!");
    }
}
