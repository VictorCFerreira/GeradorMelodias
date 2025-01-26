package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.request.CreateDownloadDTO;
import GeradorMelodias.GeradorMelodias.entity.Download;
import GeradorMelodias.GeradorMelodias.repository.DownloadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class DownloadService {


    @Autowired
    private DownloadRepository downloadRepository;

    public void saveDownload(CreateDownloadDTO data) {
        Download download = new Download();
        downloadRepository.save(download);
    }

}
