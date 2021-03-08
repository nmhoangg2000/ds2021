#include "file_transfer.h"
#include "stdio.h"

char *
get_file_name_from_path(char *filepath, char *delimiter) 
{
	char *token = strtok(filepath,"/");
	char *actual_file;
	while( token != NULL ){
		actual_file = token;
		token = strtok(NULL, "/");
	}
	return actual_file;
}

void
filetransfer_1( char* host, char *command, char *filepath )
{
	CLIENT *clnt;
	struct chunk  *result_1;
	chunk  ft_1_arg;
	#ifndef DEBUG
	clnt = clnt_create(host, FILETRANSFER, FILETRANSFER_1, "udp");
	if (clnt == NULL) {
		clnt_pcreateerror(host);
		exit(1);
	}
	#endif /* DEBUG */
	FILE *fp;
	if(strcmp(command,"-upload") == 0){
		ft_1_arg.flag = 1;
		fp = fopen(filepath,"rb");
		char *actual_file = get_file_name_from_path(filepath, "/");
		if(fp==NULL){
			printf("Sorry the file cannot be opened");
			exit (1);
		}
		strcpy(ft_1_arg.dirname, actual_file);
		while(1){
			memset(&(ft_1_arg.sendBuff[0]), 0, sizeof(ft_1_arg.sendBuff)); //clear the whole buffer before sending anything
			int nread = fread(ft_1_arg.sendBuff,1,1025,fp); //read from the file
			if(nread > 0){//if you read successfully then send this data
			result_1 = ft_1(&ft_1_arg, clnt);
			}
			if (nread < 1025){
				if(ferror(fp)) printf("Error reading\n");
			break;
			}
		}
		//finally close the file
		fclose(fp);
	} else if(strcmp(command,"-download") == 0){
		ft_1_arg.flag = 2;
		strcpy(ft_1_arg.dirname, filepath);
		char *actual_file = get_file_name_from_path(filepath, "/");
		FILE *fp;
		fp = fopen(actual_file, "ab+");
		if(fp==NULL){
			printf("Sorry the file cannot be opened");
			exit (1);
		}
		do{
			result_1 = ft_1(&ft_1_arg, clnt);
			//printf("%s", result_1->sendBuff);
			fwrite(result_1->sendBuff, 1,strlen(result_1->sendBuff),fp);
		}while(result_1->flag!=4);
		} else if(strcmp(command,"-getdir") == 0){
			result_1 = ft_1(&ft_1_arg, clnt);
			//puts(result_1->dirname);
			char *token = strtok(result_1->dirname,"—");
			while( token != NULL ){
				printf( " %s\n", token );
				token = strtok(NULL, "—");
			}
		}else{
			printf("Enter valid command!!!");
		}
	//result_1 = ft_1(&ft_1_arg, clnt);
	if (result_1 == (struct chunk *) NULL) {
	clnt_perror (clnt, "call failed");
	}
	#ifndef DEBUG
	clnt_destroy (clnt);
	#endif /* DEBUG */
}

int
main (int argc, char *argv[])
{
	char *host, *command, *path = NULL;
	if (argc < 3) {
		printf ("usage: %s server_host -getdir \n %s server_host -upload|-download path_of_the_file\n", argv[0], argv[0]);
		exit (1);
	}
	host = argv[1];
	command = argv[2];
	if(argc > 3)
	path = argv[3];
	filetransfer_1 (host, command, path);
	exit (0);
}

