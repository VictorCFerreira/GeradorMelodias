package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.Escala;
import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.GeradorMelodias;
import GeradorMelodias.GeradorMelodias.utils.IntervalosUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import GeradorMelodias.GeradorMelodias.repository.MelodiaRepository;

import java.sql.Date;
import java.time.LocalDateTime;
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
}
