package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import GeradorMelodias.GeradorMelodias.repository.AvaliacaoRepository;
import GeradorMelodias.GeradorMelodias.repository.MelodiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
