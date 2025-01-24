using UnityEngine;

public class CheatCommandScript : MonoBehaviour
{
    public float speedMultiplier = 100f;  // Valor de velocidade
    public float infiniteDamage = 999999f;  // Valor de dano infinito
    private Player player;
    private Shop shop;

    void Start()
    {
        player = FindObjectOfType<Player>();  // Supondo que você tenha uma classe Player
        shop = FindObjectOfType<Shop>();  // Supondo que você tenha uma classe Shop

        if (player != null && shop != null)
        {
            // Registrar para escutar mensagens do chat
            ChatSystem.OnMessageReceived += HandleChatCommand;
        }
    }

    // Método que lida com comandos do chat
    void HandleChatCommand(string message)
    {
        if (message.ToLower() == "/speed100")  // Comando para aumentar a velocidade
        {
            ActivateSpeed();
        }
        else if (message.ToLower() == "/damage")  // Comando para dano infinito
        {
            ActivateDamage();
        }
        else if (message.ToLower() == "/freebuy")  // Comando para compras grátis
        {
            ActivateFreeBuy();
        }
    }

    // Ativa a velocidade 100
    void ActivateSpeed()
    {
        if (player != null)
        {
            player.speed = speedMultiplier;  // Define a velocidade do jogador
            Debug.Log("Velocidade aumentada para 100!");
        }
    }

    // Ativa o dano infinito
    void ActivateDamage()
    {
        if (player != null)
        {
            player.damage = infiniteDamage;  // Define o dano do jogador
            Debug.Log("Dano infinito ativado!");
        }
    }

    // Ativa compras grátis
    void ActivateFreeBuy()
    {
        if (shop != null)
        {
            shop.SetFreePurchases(true);  // Supondo que o Shop tenha esse método
            Debug.Log("Compras grátis ativadas!");
        }
    }

    void OnDestroy()
    {
        // Desinscreve o sistema de chat quando o script for destruído
        if (ChatSystem.OnMessageReceived != null)
        {
            ChatSystem.OnMessageReceived -= HandleChatCommand;
        }
    }
}
