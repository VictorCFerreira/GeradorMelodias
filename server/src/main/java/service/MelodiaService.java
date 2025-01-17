package service;

import entity.Melodia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.MelodiaRepository;

import java.util.Optional;

@Service
public class MelodiaService {

    @Autowired
    private MelodiaRepository melodiaRepository;

    public Melodia saveMelodia(Melodia melodia){return melodiaRepository.save(melodia);};

    public Optional<Melodia> findById(Long id){return melodiaRepository.findById(id);};
}
