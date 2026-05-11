import ReactDOM from "react-dom";

const DropDown = ({ items, position, isPortal, portalRef }) => {

    

    const dropdownUI = (
        <div
            ref={portalRef}
            className="w-44 bg-[#0f172a] border border-white/10 rounded-xl shadow-lg"
            style={
                isPortal && position
                    ? {
                          position: "absolute",
                          top: position.top,
                          left: position.left,
                          zIndex: 1000
                      }
                    : {}
            }
        >
            {items.map((el, idx) => {
                let Icon = el.icon;
                return (
                    <div
                    onClick={(e) => {
                        e.stopPropagation();
                        if (el.onClick) el.onClick();
                    }}
                        key={idx}
                        className={`flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer
                        ${idx!=items.length - 1 && "text-white"}
                        ${idx === 0 && "rounded-t-xl"}
                        ${idx === items.length - 1 && "rounded-b-xl hover:bg-red-500/20 text-red-400"}
                    `}
                    >
                        <Icon size={20} />
                        <span className="text-sm">{el.label}</span>
                    </div>
                );
            })}
        </div>
    );

    // Portal mode (Sidebar dropdown)
    if (isPortal && position) {
        return ReactDOM.createPortal(dropdownUI, document.body);
    }

    //  Default mode (User dropdown etc.)
    return (
        <div className="absolute top-10 right-6">
            {dropdownUI}
        </div>
    );
};

export default DropDown;