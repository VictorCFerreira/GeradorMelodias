package GeradorMelodias.GeradorMelodias.controller;

import GeradorMelodias.GeradorMelodias.dto.request.CreateDownloadDTO;
import GeradorMelodias.GeradorMelodias.service.DownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/downloads")
public class DownloadController {

    @Autowired
    private DownloadService downloadService;

    @PostMapping
    public ResponseEntity<?> receiveDownload(@RequestBody CreateDownloadDTO data) throws Exception {
        downloadService.saveDownload(data);

        return ResponseEntity.ok().build();
    }



}
