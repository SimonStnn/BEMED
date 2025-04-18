FROM python:3.11-alpine

# Install dependencies
RUN pip install --no-cache-dir mkdocs-material

# Set working directory
WORKDIR /docs

# Copy documentation files
COPY . .

# Verify documentation structure
RUN ls -la && \
    echo "Content directory:" && \
    ls -la content/

# Expose port for MkDocs
EXPOSE 8000

# Start MkDocs server with specific command line options for better debugging
CMD ["sh", "-c", "ls -la content/ && mkdocs serve --verbose --dirtyreload -a 0.0.0.0:8000"]