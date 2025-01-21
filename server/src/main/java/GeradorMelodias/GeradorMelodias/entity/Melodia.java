package GeradorMelodias.GeradorMelodias.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @OneToOne
    @JoinColumn(name = "id_parametro", nullable = false)
    private Parametros parametros;
}
