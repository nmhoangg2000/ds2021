#include <sys/types.h>
#include <dirent.h>
#include "file_transfer.h"
#include "stdio.h"

struct chunk *
ft_1_svc(chunk *argp, struct svc_req *rqstp)
{
	static struct chunk result;
	printf("Michek");
	printf("Mic check %d", argp->flag);
	if(argp->flag == 1){//get the data, dump it to a file
		FILE *fp;
		char *filename = argp->dirname;
		char prefix[10] = "uploaded_";
		strcat(prefix,filename);
		fp = fopen(prefix, "ab+");
		if(fp==NULL)
		{
		printf("Sorry the file cannot be opened");
		exit (1);
		}
		//printf("%s",argp->sendBuff);
		fwrite(argp->sendBuff, 1,strlen(argp->sendBuff),fp);
		fclose(fp);
	}else if(argp->flag == 2){// get a request to send the file
		FILE *fp;
		fp = fopen(argp->dirname, "rb+");
		if(fp==NULL)
		{
		printf("Sorry the file cannot be opened");
		exit (1);
		}
		memset(&(argp->sendBuff[0]), 0, sizeof(argp->sendBuff)); //clear the whole buffer before sending anything
		int nread = fread(argp->sendBuff,1,1025,fp); //read from the file
		result = *argp;
		if(nread > 0 && nread == 1025){//if you read successfully then send this data
		return &result;
		}else if(ferror(fp)){
		printf("Error reading\n");
		}else{
		result.flag = 4;
		return &result;
		}
		//finally close the file
		fclose(fp);
	}else{
		DIR *dp;
		struct dirent *ep;
		dp = opendir ("./");
		if (dp != NULL)
		{
		while (ep = readdir (dp)){
		char fname[50];
		memset(&(fname[0]), 0, sizeof(fname));
		strcpy(fname, ep->d_name);
		strcat(fname, "—");
		strcat(result.dirname, fname);
		}
		}else
		perror ("Couldn’t open the directory");
		}
		return &result;
}
