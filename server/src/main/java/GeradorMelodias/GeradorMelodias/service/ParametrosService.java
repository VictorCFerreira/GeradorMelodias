package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.repository.ParametrosRepository;
import GeradorMelodias.GeradorMelodias.entity.Parametros;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParametrosService {

    @Autowired
    private ParametrosRepository parametrosRepository;

    public void saveParametros(Parametros parametros){parametrosRepository.save(parametros);};

    public Optional<Parametros> findById(Long id){return parametrosRepository.findById(id);};


}
