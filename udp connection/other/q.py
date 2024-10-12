MYPORT = 8000
MYGROUP_4 = '224.0.0.1'
MYTTL = 1 # Increase to reach other networks

import time
import struct
import socket
import sys
import binascii

def main():
    group = MYGROUP_6 if "-6" in sys.argv[1:] else MYGROUP_4

    if "-s" in sys.argv[1:]:
        sender(group)
    else:
        receiver(group)


def sender(group):
    addrinfo = socket.getaddrinfo(group, None)[0]

    s = socket.socket(addrinfo[0], socket.SOCK_DGRAM)

    # Set Time-to-live (optional)
    ttl_bin = struct.pack('@i', MYTTL)
    if addrinfo[0] == socket.AF_INET: # IPv4
        s.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, ttl_bin)
    else:
        s.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_MULTICAST_HOPS, ttl_bin)

    while True:
        data = repr(time.time())
        s.sendto(data + '\0', (addrinfo[4][0], MYPORT))
        time.sleep(1)


def receiver(group):
    # Look up multicast group address in name server and find out IP version
    addrinfo = socket.getaddrinfo(group, None)[0]

    # Create a socket
    s = socket.socket(addrinfo[0], socket.SOCK_DGRAM)

    # Allow multiple copies of this program on one machine
    # (not strictly needed)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    # Bind it to the port
    s.bind(('', MYPORT))

    group_bin = socket.inet_pton(addrinfo[0], addrinfo[4][0])
    # Join group
    if addrinfo[0] == socket.AF_INET: # IPv4
        mreq = group_bin + struct.pack('=I', socket.INADDR_ANY)
        s.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, mreq)
    else:
        mreq = group_bin + struct.pack('@I', 0)
        s.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_JOIN_GROUP, mreq)

    # Loop, printing any data we receive
    while True:
        data, sender = s.recvfrom(1500)
        hex_str = ' '.join(format(byte, '02x') for byte in data)
        givig_number = hex_str.upper()
        print(givig_number)
        
        hex_list = givig_number.split()
        hex_bytes = bytes.fromhex(''.join(hex_list))
        # Extract the bytes starting from the 11th byte (5 bytes)
        next_5_bytes = hex_bytes[10:15]
        abcd  = ' '.join(format(x, '02X') for x in next_5_bytes)
        # Remove spaces from hex_sequence and convert to bytes
        hex_bytes = bytes.fromhex(abcd.replace(" ", ""))
        ascii_string = hex_bytes.decode('ascii', errors='ignore')
        print(ascii_string)
        
        # for i in data:
        #     if len(hex(i).replace('0x', '')) == 1:
        #         print('0'+hex(i).replace('0x',''))
        #     else:
        #         print(hex(i).replace('0x', ''))
                
        # while data[-1:] == '\0': data = data[:-1] # Strip trailing \0's
        # print (str(sender) + '  ' + repr(data))


if __name__ == '__main__':
    main()
    
