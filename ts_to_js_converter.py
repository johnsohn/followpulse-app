import os
import subprocess
import sys

def convert_ts_to_js(directory):
    # Walk through all files and subdirectories
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                ts_file = os.path.join(root, file)
                js_file = os.path.join(root, file[:-3] + '.js')

                cmd = f'cmd /c tsc "{ts_file}" --outFile "{js_file}"'
                # Convert TS to JS using tsc
                try:
                    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                    
                    print(f"Converted: {ts_file} -> {js_file}")

                    # Remove the original .ts file
                    os.remove(ts_file)
                    print(f"Removed original: {ts_file}")
                except subprocess.CalledProcessError as e:
                    print(f"Error converting {ts_file}:")
                    print(f"Exit code: {e.returncode}")
                    print(f"Standard output: {e.stdout}")
                    print(f"Standard error: {e.stderr}")
                except FileNotFoundError:
                    print(f"Error: TypeScript compiler (tsc) not found. Make sure it's installed and in your PATH.")
                except Exception as e:
                    print(f"Error processing {ts_file}: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <directory_path>")
        sys.exit(1)

    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a valid directory")
        sys.exit(1)

    convert_ts_to_js(directory)
