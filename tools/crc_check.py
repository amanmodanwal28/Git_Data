import zlib

def calculate_file_crc32(file_path):
    try:
        with open(file_path, 'rb') as f:
            crc32 = 0
            while chunk := f.read(65536):
                crc32 = zlib.crc32(chunk, crc32)
        checksum = format(crc32 & 0xFFFFFFFF, '08X').upper()
        print(checksum)
        return checksum
    except Exception as e:
        print(f'Error calculating CRC32: {e}')
        raise

file_path = 'content/Add/2.mp4'

# file_path = 'C:\\Users\\PTCS\\Desktop\\crc\\movies\\bollywood\\jailer.mp4'
calculate_file_crc32(file_path)
