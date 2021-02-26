#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>

int main() {
    int ss, cli;
    struct sockaddr_in ad;
    char s[100];
    socklen_t ad_length = sizeof(ad);

    // create the socket
    ss = socket(AF_INET, SOCK_STREAM, 0);
    if (ss == -1) { 
        printf("socket creation failed...\n"); 
        exit(0); 
    } 
    else
        printf("Socket successfully created..\n"); 
    // bind the socket to port 12345
    memset(&ad, 0, sizeof(ad));
    ad.sin_family = AF_INET;
    ad.sin_addr.s_addr = INADDR_ANY;
    ad.sin_port = htons(8080);
    bind(ss, (struct sockaddr *)&ad, ad_length);

    // then listen
    listen(ss, 0);

    while (1) {
        // an incoming connection
        cli = accept(ss, (struct sockaddr *)&ad, &ad_length);

        int pid = fork();
        if (pid == 0) {
            // I'm the son, I'll serve this client
            printf("client 1 connected\n");
            while (1) {
                // it's client turn to chat, I wait and read message from client
                read(cli, s, sizeof(s));
                printf("client 1 says: %s\n",s);

                // now it's my (server) turn
                printf("client 1>%s", s);
                scanf("%s", s);
                write(cli, s, strlen(s) + 1);
            }
            return 0;
        }
        // else {
        //     waitpid(pid, NULL, 0);
        //     int pid1 = fork();
        //     if (pid1 == 0) {
        //         // I'm the son, I'll serve this client
        //         printf("client 1 connected\n");
        //         while (1) {
        //             // it's client turn to chat, I wait and read message from client
        //             read(cli, s, sizeof(s));
        //             printf("client 1 says: %s\n",s);

        //             // now it's my (server) turn
        //             printf("client 1>%s", s);
        //             scanf("%s", s);
        //             write(cli, s, strlen(s) + 1);
        //         }
        //         return 0;
        //     }
        //     else
        //     {
                
        //     }
            
        //}
    }
    // disconnect
    close(cli);

}
