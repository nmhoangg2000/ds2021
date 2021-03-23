/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#ifndef _FILE_TRANSFER_H_RPCGEN
#define _FILE_TRANSFER_H_RPCGEN

#define RPCGEN_VERSION	199506

#include <rpc/rpc.h>


struct chunk {
	char sendBuff[1025];
	char dirname[1000];
	int flag;
};
typedef struct chunk chunk;
#ifdef __cplusplus
extern "C" bool_t xdr_chunk(XDR *, chunk*);
#elif __STDC__
extern  bool_t xdr_chunk(XDR *, chunk*);
#else /* Old Style C */
bool_t xdr_chunk();
#endif /* Old Style C */


#define FILETRANSFER ((rpc_uint)0x2fffffff)
#define FILETRANSFER_1 ((rpc_uint)1)

#ifdef __cplusplus
#define FT ((rpc_uint)1)
extern "C" struct chunk * ft_1(chunk *, CLIENT *);
extern "C" struct chunk * ft_1_svc(chunk *, struct svc_req *);

#elif __STDC__
#define FT ((rpc_uint)1)
extern  struct chunk * ft_1(chunk *, CLIENT *);
extern  struct chunk * ft_1_svc(chunk *, struct svc_req *);

#else /* Old Style C */
#define FT ((rpc_uint)1)
extern  struct chunk * ft_1();
extern  struct chunk * ft_1_svc();
#endif /* Old Style C */

#endif /* !_FILE_TRANSFER_H_RPCGEN */