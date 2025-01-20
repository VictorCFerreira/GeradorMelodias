package GeradorMelodias.GeradorMelodias.controller;
import GeradorMelodias.GeradorMelodias.entity.Parametros;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import GeradorMelodias.GeradorMelodias.service.ParametrosService;

@RestController
@RequestMapping("/parametros")
public class ParametrosController {

    @Autowired
    private ParametrosService parametrosService;


    @PostMapping
    public ResponseEntity<?> saveParametros(@RequestBody Parametros data) throws Exception {
        parametrosService.saveParametros(data);

        return ResponseEntity.ok().build();
    }
}
