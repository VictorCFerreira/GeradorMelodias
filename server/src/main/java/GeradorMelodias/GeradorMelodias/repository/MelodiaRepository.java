package GeradorMelodias.GeradorMelodias.repository;

import GeradorMelodias.GeradorMelodias.entity.Melodia;
import GeradorMelodias.GeradorMelodias.enums.Sensacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MelodiaRepository extends JpaRepository<Melodia, Long> {

    @Query("SELECT " +
            "CASE " +
            "  WHEN :parametro = 'BPM' THEN CONCAT(FLOOR(m.bpm / 10) * 10, '-', FLOOR(m.bpm / 10) * 10 + 10) " +
            "  WHEN :parametro = 'Escala' THEN m.escala " +
            "  WHEN :parametro = 'Instrumento' THEN m.instrumento " +
            "  WHEN :parametro = 'Oitavas' THEN m.oitavas " +
            "  ELSE 'Desconhecido' " +
            "END AS parametroValor, " +
            "a.sensacao, COUNT(a) AS quantidade " +
            "FROM Melodia m " +
            "JOIN Avaliacao a ON m.id = a.melodia.id " +
            "WHERE a.sensacao = :sensacao " +
            "GROUP BY parametroValor, a.sensacao "+
            "ORDER BY quantidade desc")
    List<Object[]> countByParametroAndSensacao(@Param("parametro") String parametro,
                                               @Param("sensacao") Sensacao sensacao);


    @Query("SELECT " +
            "CASE " +
            "WHEN :parametro = 'BPM' THEN CONCAT(FLOOR(m.bpm / 10) * 10, '-', FLOOR(m.bpm / 10) * 10 + 10)" +
            "  WHEN :parametro = 'Escala' THEN m.escala " +
            "  WHEN :parametro = 'Instrumento' THEN m.instrumento " +
            "  WHEN :parametro = 'Oitavas' THEN m.oitavas " +
            "  WHEN :parametro = 'Sensacao' THEN a.sensacao " +
            "  ELSE 'Desconhecido' " +
            "END AS parametroValor, " +
            "a.nota, COUNT(a) AS quantidade " +
            "FROM Melodia m " +
            "JOIN Avaliacao a ON m.id = a.melodia.id " +
            "WHERE a.nota BETWEEN :minNota AND :maxNota " +
            "GROUP BY parametroValor, a.nota " +
            "ORDER BY quantidade desc")
    List<Object[]> countByParametroAndNota(@Param("parametro") String parametro, @Param("minNota") Integer minNota, @Param("maxNota") Integer maxNota);

}
