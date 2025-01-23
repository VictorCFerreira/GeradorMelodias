package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.generic.AvaliacaoDTO;
import GeradorMelodias.GeradorMelodias.dto.request.CreateAvaliacaoDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.avaliacao.Avaliacao;
import GeradorMelodias.GeradorMelodias.repository.AvaliacaoRepository;
import GeradorMelodias.GeradorMelodias.repository.MelodiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {

    @Autowired
    private MelodiaService melodiaService;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public Avaliacao saveAvaliacao(CreateAvaliacaoDTO data) {
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setNota(data.nota());
        avaliacao.setSensacao(data.sensacao());

        Optional<Melodia> melodia = melodiaService.findById(data.melodiaId());
        melodia.ifPresent(avaliacao::setMelodia);

        return avaliacaoRepository.save(avaliacao);
    }

    ;

    public Optional<Avaliacao> findById(Long id) {
        return avaliacaoRepository.findById(id);
    }

    public List<Avaliacao> findAll(){
        return avaliacaoRepository.findAll();
    }

    ;
}
