package GeradorMelodias.GeradorMelodias.service;

import GeradorMelodias.GeradorMelodias.dto.generic.ParametrosDTO;
import GeradorMelodias.GeradorMelodias.dto.request.CreateMelodiaDTO;
import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.entity.Parametros;
import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.Escala;
import GeradorMelodias.GeradorMelodias.utils.GeracaoMelodias.GeradorMelodias;
import GeradorMelodias.GeradorMelodias.utils.IntervalosUtils;
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

    @Autowired
    private GeradorMelodias geradorMelodias;

    @Autowired
    private IntervalosUtils intervalosUtils;

    public Melodia gerarMelodia(ParametrosDTO data) throws Exception {
        // Localizar os parâmetros (se fornecidos)
        Parametros parametros = new Parametros();
        parametros.setInstrumento(data.instrumento());
        parametros.setEscala(data.escala());
        parametros.setOitavas(data.oitavas());
        parametros.setBpm(data.bpm());


        parametrosService.saveParametros(parametros);

        // Gerar a melodia
        Escala escalaEnum = Escala.valueOf(parametros.getEscala());
        String melodiaGerada = geradorMelodias.gerarMelodia(
                parametros.getInstrumento(),
                escalaEnum,
                parametros.getBpm(),
                3,
                parametros.getOitavas()
        );

        // Calcular os intervalos
        String intervalos = intervalosUtils.calcularIntervalos(melodiaGerada, escalaEnum);

        // Criar e salvar a melodia
        Melodia melodia = new Melodia();
        melodia.setMelodia(melodiaGerada);
        melodia.setIntervalos(intervalos);
        melodia.setParametros(parametros);

        return melodiaRepository.save(melodia);
    }


    public Optional<Melodia> findById(Long id){return melodiaRepository.findById(id);};
}
