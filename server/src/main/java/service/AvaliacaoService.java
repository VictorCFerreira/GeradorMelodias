package service;

import entity.Melodia;
import entity.avaliacao.Avaliacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.AvaliacaoRepository;
import repository.MelodiaRepository;

import java.util.Optional;

@Service
public class AvaliacaoService {

    @Autowired
    private MelodiaRepository melodiaRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public Avaliacao saveAvaliacao(Avaliacao avaliacao){
        return avaliacaoRepository.save(avaliacao);};

    public Optional<Avaliacao> findById(Long id){return avaliacaoRepository.findById(id);};
}
