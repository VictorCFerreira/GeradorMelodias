package GeradorMelodias.GeradorMelodias.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Table(name = "melodia")
@Entity
@Getter
@Setter
public class Melodia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String melodia;
    private String intervalos;
    private String instrumento;
    private String escala;
    private Integer oitavas;
    private Integer bpm;
    private LocalDateTime dataGeracao;

}
