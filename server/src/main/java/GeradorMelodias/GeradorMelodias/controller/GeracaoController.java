package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.dto.request.MelodiaCruDTO;
import GeradorMelodias.GeradorMelodias.dto.response.ResponseGeracaoDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import GeradorMelodias.GeradorMelodias.service.MelodiaService;
import org.apache.coyote.Response;
import org.jfugue.midi.MidiFileManager;
import org.jfugue.pattern.Pattern;
import org.jfugue.pattern.PatternProducer;
import org.jfugue.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/geracao")
public class GeracaoController {

    @Autowired
    private MelodiaService melodiaService;

    @PostMapping
    public ResponseEntity<ResponseGeracaoDTO> generateMelodia(@RequestBody ParametrosDTO data) throws Exception {
        Melodia melodia = melodiaService.gerarMelodia(data);

        File midiFile = new File("melodia"+melodia.getId()+".mid");
        System.out.println(midiFile.toPath());
        MidiFileManager.savePatternToMidi(new Pattern(melodia.getMelodia()), midiFile);

        byte[] midiBytes = Files.readAllBytes(midiFile.toPath());

        ResponseGeracaoDTO response = new ResponseGeracaoDTO(
            melodia.getId(),
            midiBytes
        );

        return ResponseEntity.ok().body(response);
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
