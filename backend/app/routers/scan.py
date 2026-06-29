"""Scan router — CSV upload and parsing (the MVP core)."""
from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.schemas.schemas import CSVParseResponse
from app.services.csv_parser import parse_csv

router = APIRouter(prefix="/scan", tags=["scan"])


@router.post("/upload", response_model=CSVParseResponse)
async def upload_csv(file: UploadFile = File(...)):
    """Upload a bank CSV file and run subscription detection.

    Supports Swedbank EE, SEB, and LHV CSV formats.
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided",
        )

    # Read file contents
    contents = await file.read()
    if not contents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty file",
        )

    # Parse CSV and detect subscriptions
    import io
    result = parse_csv(io.BytesIO(contents))
    return result
