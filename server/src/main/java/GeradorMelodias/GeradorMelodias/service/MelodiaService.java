package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.dto.request.RequestAnaliseParametroNotaDTO;
import GeradorMelodias.GeradorMelodias.dto.request.RequestAnaliseParametroSensacaoDTO;
import GeradorMelodias.GeradorMelodias.dto.response.AnaliseNotaAvaliadaPorParametro;
import GeradorMelodias.GeradorMelodias.dto.response.AnaliseSensacaoAvaliadaPorParametro;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.enums.Sensacao;
import GeradorMelodias.GeradorMelodias.enums.Escala;
import GeradorMelodias.GeradorMelodias.utils.GeradorMelodias;
import GeradorMelodias.GeradorMelodias.utils.IntervalosUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import GeradorMelodias.GeradorMelodias.repository.MelodiaRepository;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MelodiaService {

    @Autowired
    private MelodiaRepository melodiaRepository;


    private final GeradorMelodias geradorMelodias = new GeradorMelodias();

    private final IntervalosUtils intervalosUtils = new IntervalosUtils();

    public Melodia gerarMelodia(ParametrosDTO data) throws Exception {
        // Localizar os parâmetros (se fornecidos)
        Melodia melodia = new Melodia();
        melodia.setInstrumento(data.instrumento());
        melodia.setEscala(data.escala());
        melodia.setOitavas(data.oitavas());
        melodia.setBpm(data.bpm());
        melodia.setDataGeracao(LocalDateTime.now());



        // Gerar a melodia
        Escala escalaEnum = Escala.valueOf(melodia.getEscala());
        String melodiaGerada = geradorMelodias.gerarMelodia(
                melodia.getInstrumento(),
                escalaEnum,
                melodia.getBpm(),
                3,
                melodia.getOitavas()
        );

        // Calcular os intervalos
        String intervalos = intervalosUtils.calcularIntervalos(melodiaGerada, escalaEnum);

        melodia.setMelodia(melodiaGerada);
        melodia.setIntervalos(intervalos);

        return melodiaRepository.save(melodia);
    }


    public Optional<Melodia> findById(Long id){return melodiaRepository.findById(id);};

    public List<AnaliseSensacaoAvaliadaPorParametro> getAnaliseSensacaoPorParametro(
            RequestAnaliseParametroSensacaoDTO dto) {

        List<Object[]> result = melodiaRepository.countByParametroAndSensacao(dto.parametro(), dto.sensacao());
        List<AnaliseSensacaoAvaliadaPorParametro> response = new ArrayList<>();

        for (Object[] row : result) {
            String parametroValor = (String) row[0];
            Sensacao sensacaoRes = (Sensacao) row[1];
            Long quantidade = (Long) row[2];
            response.add(new AnaliseSensacaoAvaliadaPorParametro(parametroValor, sensacaoRes, quantidade));
        }
        return response;
    }

    public List<AnaliseNotaAvaliadaPorParametro> getAnaliseSensacaoPorParametro(
            RequestAnaliseParametroNotaDTO dto) {

        List<Object[]> result = melodiaRepository.countByParametroAndNota(dto.parametro(), dto.notaMinima(), dto.notaMaxima());
        List<AnaliseNotaAvaliadaPorParametro> response = new ArrayList<>();

        for (Object[] row : result) {
            String parametroValor = (String) row[0];
            Integer nota = (Integer) row[1];
            Long quantidade = (Long) row[2];
            response.add(new AnaliseNotaAvaliadaPorParametro(parametroValor, dto.notaMinima()+"-"+dto.notaMaxima(), quantidade));
        }
        return response;
    }
}
