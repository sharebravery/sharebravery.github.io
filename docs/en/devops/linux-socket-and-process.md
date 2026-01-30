---
title: Socket Programming and Processes in Linux
date: 2025-06-11
categories:
  - DevOps
tags:
  - Linux
---

# Socket Programming and Processes in Linux

In a Linux environment, we can build robust server-client architectures using Sockets and multi-processing.

# The Socket Communication Flow

Here is the lifecycle of a Socket connection:

![](https://cdn.jsdelivr.net/gh/sharebravery/album@master/socket.drawio.svg)

Key functions you need to know:

## Server Side:

### `socket()`
Creates an endpoint for communication.
`int socket(int domain, int type, int protocol);`
- `domain`: `AF_INET` (IPv4)
- `type`: `SOCK_STREAM` (TCP)

### `bind()`
Assigns an address (IP + Port) to the socket.

### `listen()`
Marks the socket as passive, ready to accept incoming connections.

### `accept()`
Extracts the first connection request from the queue and creates a *new* connected socket.

### `recv()` / `send()`
Read and write data.

## Client Side:

### `connect()`
Initiates a connection to the server.

## Code Implementation

### server.c (Simplified)

```c
// ... headers ...

int main(int argc, char *argv[]) {
    int s_fd = socket(AF_INET, SOCK_STREAM, 0);
    // ... error checking ...

    struct sockaddr_in server_addr;
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = inet_addr(argv[1]);
    server_addr.sin_port = htons(atoi(argv[2]));

    bind(s_fd, (struct sockaddr *)&server_addr, sizeof(server_addr));
    listen(s_fd, 10);

    printf("Server listening on %s...\n", argv[2]);

    while (1) {
        struct sockaddr_in client_addr;
        int len = sizeof(client_addr);
        int c_fd = accept(s_fd, (struct sockaddr *)&client_addr, &len);

        printf("Connected: %s\n", inet_ntoa(client_addr.sin_addr));

        // Echo loop
        while (1) {
            int bytes = recv(c_fd, buf, MAX_LINE, 0);
            if (bytes <= 0) break;
            send(c_fd, buf, bytes, 0);
        }
        close(c_fd);
    }
    close(s_fd);
    return 0;
}
```

### client.c (Simplified)

```c
// ... headers ...

int main(int argc, char *argv[]) {
    int c_fd = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in client_addr;
    client_addr.sin_family = AF_INET;
    client_addr.sin_addr.s_addr = inet_addr(argv[1]);
    client_addr.sin_port = htons(atoi(argv[2]));

    connect(c_fd, (struct sockaddr *)&client_addr, sizeof(client_addr));

    printf("Connected to server.\n");

    while (1) {
        printf("Msg: ");
        fgets(buf, MAX_LINE, stdin);
        send(c_fd, buf, sizeof(buf), 0);
        recv(c_fd, buf, MAX_LINE, 0);
        printf("Echo: %s", buf);
    }
    close(c_fd);
    return 0;
}
```

---
*END*
