
struct chunk{
  char sendBuff[1025];
  char dirname[1000];
  int flag;
};

program FILETRANSFER {
  version FILETRANSFER_1 {
    struct chunk FT(chunk) = 1;
  } = 1;
} = 0x2fffffff;