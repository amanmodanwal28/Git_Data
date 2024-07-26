import zlib
import os

def parse_config_file(file_path):
    data = {}
    with open(file_path, 'r') as file:
        for line in file:
            # Skip empty lines
            if not line.strip():
                continue
            # Split the line by whitespace and separate values
            parts = line.split()
            if len(parts) == 3:
                crc, size, filename = parts
                # Normalize the filename by removing extra spaces around it
                filename = filename.strip()
                # Skip header lines
                if filename.upper() == "FILENAME" and crc.upper() == "CRC":
                    continue
                data[filename] = crc

    return data 

def calculate_crc32(file_path):
    """Calculate the CRC32 checksum of a file."""
    try:
        with open(file_path, 'rb') as f:
            file_data = f.read()
        return format(zlib.crc32(file_data) & 0xFFFFFFFF, '08X')
    except FileNotFoundError:
        return None

def check_file_existence(file_dict, base_path):
    for filename, expected_crc in file_dict.items():
        # Construct the full path by joining the base directory with the filename
        full_path = os.path.join(base_path+ filename)
        print(full_path)

        if os.path.exists(full_path):
            # Calculate the actual CRC32 checksum of the file
            actual_crc = calculate_crc32(full_path)
            if actual_crc is None:
                print("Filename: {}, Status: Error reading file".format(full_path))
            elif actual_crc == expected_crc:
                print("Filename: {}, CRC: {}, Status: Exists and CRC matches".format(full_path, expected_crc))
            else:
                print("Filename: {}, CRC: {}, Status: Exists but CRC does not match".format(full_path, expected_crc))
        else:
            print("Filename: {}, CRC: {}, Status: Does not exist".format(full_path, expected_crc))

# Path to the config.sys file
config_file_path = "CONFIG.SYS"

# Parse the config file
config_data = parse_config_file(config_file_path)

# Base directory to check file existence
base_directory = "/usr/share/apache2/htdocs"

# Check if files exist
check_file_existence(config_data, base_directory)
