package controller;

import entity.Melodia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.MelodiaService;

@RestController
@RequestMapping("/melodia")
public class MelodiaController {

    @Autowired
    private MelodiaService melodiaService;


    @PostMapping
    public ResponseEntity<?> receiveHeartBeat(@RequestBody Melodia data) throws Exception {
        melodiaService.saveMelodia(data);

        return ResponseEntity.ok().build();
    }
}
