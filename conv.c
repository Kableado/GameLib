
#include <stdio.h>
#include <string.h>


int Aux_Linea(FILE *f,char *line){
	int c;
	int i=0;
	memset(line,0,1024);
	while(i<1024){
		c=fgetc(f);
		if(c==EOF){
			line[i]=0;
			return(0);
		}
		if(c=='\r'){
			continue;
		}
		if(c=='\n'){
			line[i]=0;
			break;
		}
		line[i]=c;
		i++;
	}
	return(1);
}

int convert(char *file){
	FILE *f,*f2;
	char file2[1024];
	char line[1024];
	int w,h;
	int i,n;
	int loop;

	f=fopen(file,"rb");
	if(!f){
		return(0);
	}
	sprintf(file2,"%s.txt",file);
	f2=fopen(file2,"wb");
	if(!f2){
		fclose(f);
		return(0);
	}

	Aux_Linea(f,line);
	sscanf(line,"%d %d",&w,&h);
	fprintf(f2,"%d %d\n",w,h);

	loop=0;
	do{
		loop=Aux_Linea(f,line);
		n=strlen(line);
		for(i=0;i<n;i++){
			fprintf(f2,"%c%c",line[i],line[i]);
		}
		fprintf(f2,"\n");
	}while(loop);

	fclose(f);
	fclose(f2);
	return(1);
}


int main(int argc,char *argv[]){
	char file[1024];
	int i;

	i=0;
	do{
		sprintf(file,"data/level_%02d.txt",i);
		printf("%s\n",file);
		if(!convert(file)){
			break;
		}
		i++;
	}while(1);

	return(1);
}





