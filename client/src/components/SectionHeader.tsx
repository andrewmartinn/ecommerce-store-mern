interface SectionHeaderProps {
  primaryTitle: string;
  accentTitle: string;
  isCollectionsPage?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  primaryTitle,
  accentTitle,
  isCollectionsPage = false,
}) => {
  return (
    <div className="mb-3 inline-flex items-center gap-2">
      <p className="uppercase text-gray-500">
        {primaryTitle}{" "}
        <span className="font-medium uppercase text-gray-700">
          {accentTitle}
        </span>
      </p>
      <div
        className={`h-[2px] w-8 bg-gray-700 sm:w-12 ${isCollectionsPage ? "hidden sm:block" : ""}`}
      />
    </div>
  );
};

export default SectionHeader;
