package utils;
//import org.jfugue.player.Player;
import java.util.Random;


public class GeracaoMelodias
{
    private final Random random = new Random();

    public void geraMelodias() {
//        Player player = new Player();
        String[] notas = {"C", "D", "E", "F", "G", "A", "B"};
        StringBuilder melodia = new StringBuilder();
        Random rand = random;

        int tamanhoMelodia = 16; // Número de notas na melodia
        for (int i = 0; i < tamanhoMelodia; i++) {
            String nota = notas[rand.nextInt(notas.length)];
            melodia.append(nota).append(" ");
        }

        System.out.println("Melodia gerada: " + melodia.toString());
//        player.play(melodia.toString());
    }

}
