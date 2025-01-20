package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.request.CreateMelodiaDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.Parametros;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import GeradorMelodias.GeradorMelodias.repository.MelodiaRepository;

import java.util.Optional;

@Service
public class MelodiaService {

    @Autowired
    private MelodiaRepository melodiaRepository;

    @Autowired
    private ParametrosService parametrosService;

    public Melodia saveMelodia(CreateMelodiaDTO data){
        Melodia melodia = new Melodia();
        melodia.setNotas(data.notas());
        melodia.setIntervalos(data.intervalos());



        if(data.parametrosId() != null){
            Optional<Parametros> parametros = parametrosService.findById(data.parametrosId());
            melodia.setParametros(parametros.get());
        }



        return melodiaRepository.save(melodia);
    };

    public Optional<Melodia> findById(Long id){return melodiaRepository.findById(id);};
}
